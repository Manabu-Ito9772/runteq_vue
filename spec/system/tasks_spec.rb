require 'rails_helper'

RSpec.describe "Tasks", type: :system do
  fit 'トップページが表示されている' do
    visit root_path
    expect(page).to have_content('はじめる'), 'はじめるボタンがトップページに表示されていません'
  end
end
