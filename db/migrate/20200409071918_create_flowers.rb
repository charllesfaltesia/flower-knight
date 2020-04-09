class CreateFlowers < ActiveRecord::Migration[5.2]
  def change
    create_table :flowers do |t|
      t.string :name
      t.integer :hp
      t.integer :atk
      t.integer :de
      t.integer :loc
      t.string :atr
      t.string :nation
      t.string :skill
    end
  end
end
