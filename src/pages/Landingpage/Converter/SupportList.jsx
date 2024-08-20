import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Home from "../Home";

const SupportList = () => {
  const MySwal = withReactContent(Swal);
  const [timer, setTimer] = useState(3);

  useEffect(() => {
    MySwal.fire({
      title: "Redirecting...",
      html: `Mengalihkan ke halaman https://www.convertapi.com/api dalam <b>${
        timer ? timer : 0
      }</b> detik`,
      timer: 5000,
      timerProgressBar: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
        const timerElement = Swal.getPopup().querySelector("b");
        const updateTimer = () => {
          const timeLeft = Math.ceil(Swal.getTimerLeft() / 1000); // Ubah ke detik
          timerElement.textContent = timeLeft;
        };
        updateTimer();
        const timerInterval = setInterval(updateTimer, 200); // Perbarui setiap detik
        return () => clearInterval(timerInterval); // Hentikan interval saat komponen dibongkar
      },
    }).then(() => {
      setTimeout(() => {
        window.location.href = "https://www.convertapi.com/api";
      }, 5000);
    });
  }, []);

  return (
    <>
      <Home />
    </>
  );
};

export default SupportList;
