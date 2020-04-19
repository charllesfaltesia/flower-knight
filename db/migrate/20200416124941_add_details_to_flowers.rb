class AddDetailsToFlowers < ActiveRecord::Migration[5.2]
  def change
    add_column :flowers, :a1, :string
    add_column :flowers, :a2, :string
    add_column :flowers, :a3, :string
    add_column :flowers, :a4, :string
    add_column :flowers, :b1, :string
    add_column :flowers, :b2, :string
    add_column :flowers, :b3, :string
    add_column :flowers, :b4, :string
    add_column :flowers, :c1, :string
    add_column :flowers, :c2, :string
    add_column :flowers, :c3, :string
    add_column :flowers, :c4, :string
    add_column :flowers, :d1, :string
    add_column :flowers, :d2, :string
    add_column :flowers, :d3, :string
    add_column :flowers, :d4, :string
    add_column :flowers, :e1, :string
    add_column :flowers, :e2, :string
    add_column :flowers, :e3, :string
    add_column :flowers, :e4, :string
    add_column :flowers, :f1, :string
    add_column :flowers, :f2, :string
    add_column :flowers, :f3, :string
    add_column :flowers, :f4, :string
  end
end
