class ChangeNullToTrue < ActiveRecord::Migration[6.0]
  def up
    change_column :tasks, :status, :integer, null: true
  end

  def down
    change_column :tasks, :status, :integer, null: false
  end
end
