class RenameTypeColumnToAbilities < ActiveRecord::Migration[5.2]
  def change
    rename_column :abilities, :type, :name
  end
end
