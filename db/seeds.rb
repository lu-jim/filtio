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

puts "Created #{Company.count} companies with #{Founder.count} founders"
