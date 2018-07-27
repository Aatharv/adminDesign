(function(window) {
  "use strict";
  angular
    .module("myApp", ["ngSlimScroll"])
    .controller("demoController", demoController)
    .directive("sidebarMenu", sidebarMenu);
  demoController.$inject = ["$scope"];

  function demoController() {
    var vm = this;
    vm.welcomeTitle = "Welcome to demo application";
  }

  function sidebarMenu() {
    var directive = {
      link: link,
      restrict: "A"
    };
    return directive;
    function link(scope, element, attrs) {
      var animationSpeed = 300,
        subMenuSelector = ".sidebar-submenu";
        element.on("click", "li a", function(e) {
        console.log("Clicked");
        var $this = $(this);
        var checkElement = $this.next();

        if (checkElement.is(subMenuSelector) && checkElement.is(":visible")) {
          checkElement.slideUp(animationSpeed, function() {
            checkElement.removeClass("menu-open");
          });
          checkElement.parent("li").removeClass("active");
        }

        //If the menu is not visible
        else if (
          checkElement.is(subMenuSelector) &&
          !checkElement.is(":visible")
        ) {
          //Get the parent menu
          var parent = $this.parents("ul").first();
          //Close all open menus within the parent
          var ul = parent.find("ul:visible").slideUp(animationSpeed);
          //Remove the menu-open class from the parent
          ul.removeClass("menu-open");
          //Get the parent li
          var parent_li = $this.parent("li");

          //Open the target menu and add the menu-open class
          checkElement.slideDown(animationSpeed, function() {
            //Add the class active to the parent li
            checkElement.addClass("menu-open");
            parent.find("li.active").removeClass("active");
            parent_li.addClass("active");
          });
        }
        //if this isn't a link, prevent the page from being redirected
        if (checkElement.is(subMenuSelector)) {
          e.preventDefault();
        }
      });
    }
  }
})();
