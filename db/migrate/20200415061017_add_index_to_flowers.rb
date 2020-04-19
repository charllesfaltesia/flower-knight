class AddIndexToFlowers < ActiveRecord::Migration[5.2]
  def change
    add_index :flowers, :job
    add_index :flowers, :nation
    add_index :flowers, :skill
    add_index :flowers, :year
  end
end
