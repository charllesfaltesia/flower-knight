class Ability < ApplicationRecord
  has_many :flower_abilities
  has_many :flowers, through: :flower_abilities
end
