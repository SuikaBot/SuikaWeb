import React, { useEffect } from "react";

const SidebarToggle = () => {
  useEffect(() => {
    const sidebar = document.getElementById("sidebar");
    const sidebarBackdrop = document.getElementById("sidebarBackdrop");
    const toggleSidebarMobileEl = document.getElementById(
      "toggleSidebarMobile"
    );
    const toggleSidebarMobileHamburger = document.getElementById(
      "toggleSidebarMobileHamburger"
    );
    const toggleSidebarMobileClose = document.getElementById(
      "toggleSidebarMobileClose"
    );
    const toggleSidebarMobileSearch = document.getElementById(
      "toggleSidebarMobileSearch"
    );

    const toggleSidebar = () => {
      sidebar.classList.toggle("hidden");
      sidebarBackdrop.classList.toggle("hidden");
      toggleSidebarMobileHamburger.classList.toggle("hidden");
      toggleSidebarMobileClose.classList.toggle("hidden");
    };

    if (toggleSidebarMobileEl && sidebarBackdrop && toggleSidebarMobileSearch) {
      toggleSidebarMobileEl.addEventListener("click", toggleSidebar);
      sidebarBackdrop.addEventListener("click", toggleSidebar);
      toggleSidebarMobileSearch.addEventListener("click", toggleSidebar);
    }

    return () => {
      if (
        toggleSidebarMobileEl &&
        sidebarBackdrop &&
        toggleSidebarMobileSearch
      ) {
        toggleSidebarMobileEl.removeEventListener("click", toggleSidebar);
        sidebarBackdrop.removeEventListener("click", toggleSidebar);
        toggleSidebarMobileSearch.removeEventListener("click", toggleSidebar);
      }
    };
  }, []);
};

export default SidebarToggle;
