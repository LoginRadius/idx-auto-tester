/**
 * Css locators of ief auth.aspx and profile.aspx
 */

module.exports = {
    authPage: {
        login: {
            registerLink: "#lr-traditional-login div.lr-link-box .lr-register-link",
            loginPageId: "#login-container",
            loginSubmit: "#loginradius-submit-login",
            loginEmail: "#loginradius-login-emailid",
            loginPhone: "#loginradius-login-phoneId",
            loginUserName: "#loginradius-login-username",
            loginPassword: "#loginradius-login-password",
            rememberMeLocator: "#loginradius-login-stayLogin",
            instantLoginButton: "#loginradius-linksignin-email-me-a-link-to-sign-in",
            instantOTPLoginBtn: "#loginradius-otpsignin-send-otp-to-sign-in",
            loginDiv: "#lr-traditional-login",
            validators: {
                emailIdErrorMessage: "#validation-loginradius-login-emailid",
                passwordErrorMessage: "#validation-loginradius-login-password"
            }
        },
        register: {
            submit: "#loginradius-submit-register",
            gender: "#loginradius-registration-gender",
            confirmPassword: '#loginradius-registration-confirmpassword',
            emailValidation: "#validation-loginradius-registration-emailid",
            passwordValidation: "#validation-loginradius-registration-password",
            confirmpasswordValidation: "#validation-loginradius-registration-confirmpassword",
        },
        resetPassword: {
            resetPasswordLink: "body > a:nth-child(3)",
            resetButtonLocator: "#lr-traditional-login > div.lr-link-box .lr-raas-forgot-password",
            passwordEmailLocator: "#loginradius-forgotpassword-emailid",
            passwordButtonLocator: "#loginradius-submit-send",
            newPasswordLocator: "#loginradius-resetpassword-password",
            confirmPasswordLocator: "#loginradius-resetpassword-confirmpassword",
            resetPasswordButtonLocator: "#loginradius-submit-reset-password",
        }

    },
    profilePage: {
        menu: ".lr-menu-button",
        accountmenu: ".lr-menu.lr-account-menu",
        profileImage: ".lr-profile-image",
        editProfileLocator: "div.lr-menu-list-frame > a:nth-child(1)",
        firstNameLocator: "#loginradius-profileeditor-firstname",
        lastNameLocator: "#loginradius-profileeditor-lastname",
        lastNameProfileLocator: "#profile-viewer > div",
        updateProfileButtonLocator: "#loginradius-submit-update-profile",
        closeProfileEditorLocator: "#lr-close",
        changePassword: {
            changePasswordMenuLocator: ".lr-menu-button",
            changePasswordLinkLocator: "#lr-showifjsenabled > div.grid.lr-hostr-container.lr-hostr-logged-in > div.grid.lr-hostr-frame.cf > div.lr-profile-frame.lr-social-login-frame.lr-frames.lr-sample-background-enabled.cf > div.lr-menu.lr-account-menu > div.lr-menu-list-frame > a:nth-child(2)",
            changePasswordDivLocator: "#lr-change-password",
            oldPasswordLocator: "#loginradius-changepassword-oldpassword",
            newPasswordLocator: "#loginradius-changepassword-newpassword",
            confirmPasswordLocator: "#loginradius-changepassword-confirmnewpassword",
            changePasswordButtonLocator: "#loginradius-submit-submit",
            oldPasswordValidationLocator: "#validation-loginradius-changepassword-oldpassword",
            newPasswordValidationLocator: "#validation-loginradius-changepassword-newpassword",
            confirmPasswordValidationLocator: "#validation-loginradius-changepassword-confirmnewpassword",
        },
        logoutBtn: "#lr-showifjsenabled > div.grid.lr-hostr-container.lr-hostr-logged-in > div.grid.lr-hostr-frame.cf > div.lr-profile-frame.lr-social-login-frame.lr-frames.lr-sample-background-enabled.cf > div.lr-menu.lr-account-menu > div.lr-menu-list-frame > a.lr-logout.lr-menu-list"
    },
    commonLocators: {
        notificationDiv: "#lr-raas-message",
        notificationDivLocator: "body > a:nth-child(1)",
        socialLoginDiv: "#interfacecontainerdiv"
    }
};