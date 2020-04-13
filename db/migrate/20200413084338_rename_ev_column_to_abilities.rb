class RenameEvColumnToAbilities < ActiveRecord::Migration[5.2]
  def change
    rename_column :abilities, :ev, :weight
  end
end
