class CallsController < ApplicationController
  before_action :set_company
  before_action :set_call, only: [:show, :edit, :update, :destroy]

  def show
  end

  def new
    @call = @company.calls.build
    @participants = Participant.by_name
  end

  def create
    @call = @company.calls.build(call_params)
    
    if @call.save
      # Add selected participants
      if params[:participant_ids].present?
        params[:participant_ids].each do |participant_id|
          next if participant_id.blank?
          @call.call_participants.create(participant_id: participant_id)
        end
      end
      
      redirect_to @company, notice: 'Call was successfully created.'
    else
      @participants = Participant.by_name
      render inertia: 'calls/new', props: { company: @company, call: @call, participants: @participants }, status: :unprocessable_entity
    end
  end

  def edit
    @participants = Participant.by_name
  end

  def update
    if @call.update(call_params)
      # Update participants
      if params[:participant_ids].present?
        # Remove existing participants and add new ones
        @call.call_participants.destroy_all
        params[:participant_ids].each do |participant_id|
          next if participant_id.blank?
          @call.call_participants.create(participant_id: participant_id)
        end
      else
        @call.call_participants.destroy_all
      end
      
      redirect_to @company, notice: 'Call was successfully updated.'
    else
      @participants = Participant.by_name
      render inertia: 'calls/edit', props: { company: @company, call: @call, participants: @participants }, status: :unprocessable_entity
    end
  end

  def destroy
    @call.destroy
    redirect_to @company, notice: 'Call was successfully deleted.'
  end

  private

  def set_company
    @company = Company.find(params[:company_id])
  end

  def set_call
    @call = @company.calls.find(params[:id])
  end

  def call_params
    params.require(:call).permit(:call_date, :call_time, :transcript_file)
  end
end
