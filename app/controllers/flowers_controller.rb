class FlowersController < ApplicationController
  def index
    # @flower = Flower.find(1)
    # @flower = Flower.find(2)
    # @ability = Ability.find(2)
    @flowers = Flower.all
    @abilities = Ability.all
    @num = 0
  end
end