class CreateFlowerAbilities < ActiveRecord::Migration[5.2]
  def change
    create_table :flower_abilities do |t|
      t.references :flower, foreign_key: true
      t.references :ability, foreign_key: true
    end
  end
end
