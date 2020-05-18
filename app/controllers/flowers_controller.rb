class FlowersController < ApplicationController
  before_action :set_chara

  def index
    # gon.flowers = @flowers
    # gon.abilities = @abilities
    respond_to do |format|
      format.html
      format.json
    end
  end

  def show
    @flower = Flower.find(params[:id])
  end

  def set_chara
    @flowers = Flower.all
    @abilities = Ability.all
  end
end