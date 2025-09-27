class CompaniesController < ApplicationController
  before_action :set_company, only: [ :show, :edit, :update, :destroy ]

  def index
    @companies = Company.includes(:founders).all
  end

  def show
    @calls = @company.calls.includes(:participants).by_date.reverse_order
  end

  def new
    @company = Company.new
    @company.founders.build
  end

  def create
    @company = Company.new(company_params)

    if @company.save
      redirect_to @company, notice: "Company was successfully created."
    else
      render inertia: "companies/new", props: { company: @company }, status: :unprocessable_entity
    end
  end

  def edit
  end

  def update
    if @company.update(company_params)
      redirect_to @company, notice: "Company was successfully updated."
    else
      render inertia: "companies/edit", props: { company: @company }, status: :unprocessable_entity
    end
  end

  def destroy
    @company.destroy
    redirect_to companies_path, notice: "Company was successfully deleted."
  end

  private

  def set_company
    @company = Company.find(params[:id])
  end

  def company_params
    params.require(:company).permit(:name, :website, founders_attributes: [ :id, :name, :linkedin, :_destroy ])
  end
end
