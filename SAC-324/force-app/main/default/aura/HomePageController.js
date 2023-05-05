//  Aura Component
({
    doInit : function(component, event, helper) {
        // Check if user is logged in
        var action = component.get("c.checkLoginStatus");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var isLoggedIn = response.getReturnValue();
                if (isLoggedIn) {
                    // Redirect to Home page
                    var urlEvent = $A.get("e.force:navigateToURL");
                    urlEvent.setParams({
                        "url": "/home"
                    });
                    urlEvent.fire();
                } else {
                    // Redirect to Login page
                    var urlEvent = $A.get("e.force:navigateToURL");
                    urlEvent.setParams({
                        "url": "/login"
                    });
                    urlEvent.fire();
                }
            }
        });
        $A.enqueueAction(action);
    }
})