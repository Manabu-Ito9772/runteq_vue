class ChangeTasksColumn4 < ActiveRecord::Migration[6.0]
  def change
    change_column :tasks, :status, :integer, null: false, default: 1
  end
end
