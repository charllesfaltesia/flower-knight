class CreateFlowers < ActiveRecord::Migration[5.2]
  def change
    create_table :flowers do |t|
      t.string :name
      t.integer :locomotion
      t.string :job
      t.string :nation
      t.string :skill
      t.integer :year
    end
    add_index :flowers, :name, unique: true
  end
end
