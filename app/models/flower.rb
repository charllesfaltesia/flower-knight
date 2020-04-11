class Flower < ApplicationRecord
  has_many :flower_abilities
  has_many :abilities, through: :flower_abilities
end
