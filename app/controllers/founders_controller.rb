class FoundersController < ApplicationController
  before_action :set_company
  before_action :set_founder, only: [ :show, :edit, :update, :destroy ]

  def show
  end

  def new
    @founder = @company.founders.build
  end

  def create
    @founder = @company.founders.build(founder_params)

    if @founder.save
      redirect_to @company, notice: "Founder was successfully created."
    else
      render inertia: "founders/new", props: { company: @company, founder: @founder }, status: :unprocessable_entity
    end
  end

  def edit
  end

  def update
    if @founder.update(founder_params)
      redirect_to @company, notice: "Founder was successfully updated."
    else
      render inertia: "founders/edit", props: { company: @company, founder: @founder }, status: :unprocessable_entity
    end
  end

  def destroy
    @founder.destroy
    redirect_to @company, notice: "Founder was successfully deleted."
  end

  private

  def set_company
    @company = Company.find(params[:company_id])
  end

  def set_founder
    @founder = @company.founders.find(params[:id])
  end

  def founder_params
    params.require(:founder).permit(:name, :linkedin)
  end
end
