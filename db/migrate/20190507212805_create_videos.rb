class CreateVideos < ActiveRecord::Migration[5.2]
  def change
    create_table :videos do |t|
      t.integer :user_id, null: false
      t.index :user_id
      t.string :title, null: false
      t.text :description
      t.timestamps
    end
  end
end
