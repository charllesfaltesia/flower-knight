class CreateAbilities < ActiveRecord::Migration[5.2]
  def change
    create_table :abilities do |t|
      t.string :type
      t.string :effect
      t.string :ev
      t.string :tar
    end
  end
end
