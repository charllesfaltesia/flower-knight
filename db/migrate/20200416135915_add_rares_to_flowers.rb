class AddRaresToFlowers < ActiveRecord::Migration[5.2]
  def change
    add_column :flowers, :rare, :string
  end
end
