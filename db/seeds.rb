# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

# Create sample companies for VC portfolio
companies_data = [
  {
    name: "TechFlow AI",
    website: "https://techflow-ai.com",
    founders: [
      { name: "Sarah Chen", linkedin: "https://linkedin.com/in/sarahchen" },
      { name: "Michael Rodriguez", linkedin: "https://linkedin.com/in/mrodriguez" }
    ]
  },
  {
    name: "GreenEnergy Solutions",
    website: "https://greenenergy.io",
    founders: [
      { name: "David Kumar", linkedin: "https://linkedin.com/in/davidkumar" }
    ]
  },
  {
    name: "FinTech Innovations",
    website: "https://fintech-innovations.com",
    founders: [
      { name: "Emily Johnson", linkedin: "https://linkedin.com/in/emilyjohnson" },
      { name: "Alex Thompson", linkedin: "https://linkedin.com/in/alexthompson" },
      { name: "Maria Garcia", linkedin: "https://linkedin.com/in/mariagarcia" }
    ]
  }
]

companies_data.each do |company_data|
  company = Company.find_or_create_by!(name: company_data[:name]) do |c|
    c.website = company_data[:website]
  end
  
  company_data[:founders].each do |founder_data|
    company.founders.find_or_create_by!(name: founder_data[:name]) do |f|
      f.linkedin = founder_data[:linkedin]
    end
  end
end

# Create sample participants
participants_data = [
  "Sarah Chen",
  "Michael Rodriguez", 
  "David Kumar",
  "Emily Johnson",
  "Alex Thompson",
  "Maria Garcia",
  "John Smith (VC Partner)",
  "Lisa Wang (Investment Analyst)",
  "Robert Davis (Senior Associate)"
]

participants_data.each do |participant_name|
  Participant.find_or_create_by!(name: participant_name)
end

# Create sample calls with transcripts
companies = Company.all
participants = Participant.all

companies.each_with_index do |company, index|
  # Create 2-3 calls per company
  (2..3).to_a.sample.times do |call_num|
    call_date = Date.current - (index * 7 + call_num * 2).days
    call_time = Time.parse("#{9 + call_num * 2}:00")
    
    call = company.calls.find_or_create_by!(
      call_date: call_date,
      call_time: call_time
    ) do |c|
      c.transcript_file = "Sample transcript content for #{company.name} call ##{call_num + 1}\n\nDiscussion topics:\n- Market opportunity\n- Revenue model\n- Team expansion\n- Funding requirements\n\nKey takeaways:\n- Strong product-market fit\n- Experienced founding team\n- Clear path to profitability"
    end
    
    # Add 3-5 participants per call (including company founders and VCs)
    company_participants = participants.select { |p| company.founders.any? { |f| f.name == p.name } }
    vc_participants = participants.select { |p| p.name.include?("VC") || p.name.include?("Investment") || p.name.include?("Associate") }
    
    selected_participants = (company_participants + vc_participants.sample(2)).uniq.sample([company_participants.size + 2, 5].min)
    
    selected_participants.each do |participant|
      call.call_participants.find_or_create_by!(participant: participant)
    end
  end
end

puts "Created #{Company.count} companies with #{Founder.count} founders"
puts "Created #{Participant.count} participants"
puts "Created #{Call.count} calls with transcript tracking"
