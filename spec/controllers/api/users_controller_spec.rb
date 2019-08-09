require 'rails_helper'

RSpec.describe Api::UsersController, type: :controller do
  describe "index" do
    before { get :index, as: :json }
    it { is_expected.to render_template :index }
  end
  describe "create" do
    context "with valid user" do
      before do 
        post :create, params: {user: {username: "user", email: "email@email.com", password: "password"}}, as: :json
      end
      it { is_expected.to render_template :show}
    end
    context "with invalid user" do
      before do 
        post :create, params: {user: {username: "user", email: "email@email.com", password: "pass"}}, as: :json
      end
      it { is_expected.to respond_with(400..500)}
    end
  end
  describe "show" do
    context "valid user" do
      before do
        user = User.create(username: "user", email: "email@email.com", password: "password")
        get :show, params: {id: user.username}, as: :json
      end
      it { is_expected.to render_template :show }
    end
    context "invalid user" do
      before do
        get :show, params: {id: 0}, as: :json
      end
      it { is_expected.to respond_with(400..500) }
    end
  end
  describe "update" do
    before do
      post :create, params: {user:{username: "user", email: "email@email.com", password: "password" }}, as: :json
    end
    context "with invalid params" do
      before { post :update, params: {id: 0}, as: :json }
      it { is_expected.to respond_with(400..500) }
    end
    context "as a different user" do
      before do
        user2 = User.create(username: "user2", email: "email2@gmail.com", password: "password")
        post :update, params: {id: user2.username, user: {description: "desc"}}, as: :json
      end
      it { is_expected.to respond_with(400..500) }
    end
    context "as the correct user" do
      before { post :update, params: {id: "user", user: {description: "desc"}}, as: :json }
      it { is_expected.to render_template :show }
    end
  end
end
