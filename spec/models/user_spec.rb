require 'rails_helper'

RSpec.describe User, type: :model do
  subject(:user) do
    User.new(username: "username", password: "password", email: "email@email.com")
  end
  describe "validations" do
    it { is_expected.to validate_presence_of :username }
    it { is_expected.to validate_uniqueness_of :username }
    it { is_expected.to validate_length_of(:username).is_at_most(32) }
    it { is_expected.to validate_exclusion_of(:username).in_array(%w(settings login signup logout discover following directory videos index subscriptions video api)).with_message("is a reserved word") }
    it { is_expected.to validate_presence_of :email }
    it { is_expected.to validate_uniqueness_of :email }
    it { is_expected.to validate_presence_of :session_token }
    it { is_expected.to validate_uniqueness_of :session_token }
    it { is_expected.to validate_presence_of :password_digest }
    it { is_expected.to validate_length_of(:description).is_at_most(300) }
    it { is_expected.to validate_length_of(:password).is_at_least(8).allow_nil }
  end

  describe "associations" do
    it { is_expected.to have_many :videos }

    it { is_expected.to have_many :user_follows }

    it { is_expected.to have_many :follows }

    it { is_expected.to have_many :user_followers }

    it { is_expected.to have_many :followers}
  end

  describe "callbacks" do
    it "Should ensure a session token after initializing a new user" do
      expect(user.session_token).to_not be_nil
    end
  end

  describe "class methods" do
    describe "::create_session_token" do
      it "should return a string" do
        token = User.create_session_token
        expect(token.class).to eq(String)
      end
      it "should be unique each time" do
        token1 = User.create_session_token
        token2 = User.create_session_token
        expect(token1).to_not eq(token2)
      end
    end
    describe "find_by_credentials" do
      subject!(:user) { User.create(username: "username", password: "password", email: "email@email.com") }
      context "with correct password" do
        it "should find a user by username" do
          found = User.find_by_credentials("username", "password")
          expect(found).to_not be_nil
          expect(user.id).to eq(found.id)
        end
        it "should find a user by email" do
          found = User.find_by_credentials("email@email.com", "password")
          expect(found).to_not be_nil
          expect(user.id).to eq(found.id)
        end
      end
      context "with incorrect password" do
        it "should not return user by username" do
          found = User.find_by_credentials("username", "password1")
          expect(found).to be_nil
        end
        it "should not return user by email" do
          found = User.find_by_credentials("email@email.com", "password1")
          expect(found).to be_nil
        end
      end
      it "should not return a user when nothing matches" do
        found = User.find_by_credentials("username1", "password")
        expect(found).to be_nil
      end
    end
  end

  describe "instance methods" do
    describe "#password=" do
      it "should create a password digest when setting password" do
        test = User.new
        expect(test.password_digest).to be_nil
        test.password = "abcd1234"
        expect(test.password_digest).to_not be_nil
      end
    end
    describe "#is_password?" do
      it "should return true when the password matches" do
        expect(user.is_password?("password")).to be_truthy
      end
      it "should return false when the password doesn't match" do
        expect(user.is_password?("not-password")).to be_falsey
      end
    end
    describe "reset_session_token!" do
      subject!(:user) { User.create(username: "username", password: "password", email: "email@email.com") }
      it "should reset the session token" do
        token = user.session_token
        user.reset_session_token!
        expect(user.session_token).to_not eq(token)
      end
      it "should save the new session token" do
        user.reset_session_token!
        expect(User.find(user.id).session_token).to eq(user.session_token)
      end
    end
  end
end
