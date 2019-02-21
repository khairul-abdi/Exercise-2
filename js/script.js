(function () {
    "use strict";

    //  Jalan alternative untuk mendapatkan elemen
    var el = function (element) {
        if (element.charAt(0) === "#") { // Jika melewati ID...
            return document.querySelector(element); // ... mengembalikan elemen tunggal
        }

        return document.querySelectorAll(element); // Kalau tidak, kembalikan nodelist
    };

    // Variables
    var viewer = el("#viewer"), // Layar kalkulator tempat hasilnya ditampilkan
        equals = el("#equals"), // Tombol Equal 
        nums = el(".num"), // Daftar Angka
        ops = el(".ops"), // Daftar Operator
        theNum = "", // Nomor Sekarang
        oldNum = "", // Nomor Pertama
        resultNum, // Hasil
        operator; // Batman

    // Kapan: Nomor diklik.Dapatkan nomor saat ini dipilih
    var setNum = function () {
        if (resultNum) { // Jika hasilnya ditampilkan, reset nomor
            theNum = this.getAttribute("data-num");
            resultNum = "";
        } else { // Jika tidak, tambahkan digit ke nomor sebelumnya(ini adalah string!)
            theNum += this.getAttribute("data-num");
        }

        viewer.innerHTML = theNum; // Tampilkan nomor saat ini

    };

    // Kapan: Operator diklik.Masukkan nomor ke oldNum dan simpan operator
    var moveNum = function () {
        oldNum = theNum;
        theNum = "";
        operator = this.getAttribute("data-ops");

        equals.setAttribute("data-result", ""); // Setel ulang hasil pada attr
    };

    // Ketika: Setara diklik.Hitung hasil
    var displayNum = function () {

        // Konversi input string ke angka
        oldNum = parseFloat(oldNum);
        theNum = parseFloat(theNum);

        // Lakukan operasi
        switch (operator) {
            case "plus":
                resultNum = oldNum + theNum;
                break;

            case "minus":
                resultNum = oldNum - theNum;
                break;

            case "times":
                resultNum = oldNum * theNum;
                break;

            case "divided by":
                resultNum = oldNum / theNum;
                break;

                // Jika sama ditekan tanpa operator, pertahankan angka dan lanjutkan
            default:
                resultNum = theNum;
        }

        // Jika NaN atau Infinity kembali
        // if (!isFinite(resultNum)) {
        //     if (isNaN(resultNum)) { // If result is not a number; set off by, eg, double-clicking operators
        //         resultNum = "You broke it!";
        //     } else { // If result is infinity, set off by dividing by zero
        //         resultNum = "Look at what you've done";
        //         el('#calculator').classList.add("broken"); // Break calculator
        //         el('#reset').classList.add("show"); // And show reset button
        //     }
        // }

        // Display result, finally!
        viewer.innerHTML = resultNum;
        equals.setAttribute("data-result", resultNum);

        // Now reset oldNum & keep result
        oldNum = 0;
        theNum = resultNum;

    };

    // When: Clear button is pressed. Clear everything
    var clearAll = function () {
        oldNum = "";
        theNum = "";
        viewer.innerHTML = "0";
        equals.setAttribute("data-result", resultNum);
    };

    /* The click events */

    // Add click event to numbers
    for (var i = 0, l = nums.length; i < l; i++) {
        nums[i].onclick = setNum;
    }

    // Add click event to operators
    for (var i = 0, l = ops.length; i < l; i++) {
        ops[i].onclick = moveNum;
    }

    // Add click event to equal sign
    equals.onclick = displayNum;

    // Add click event to clear button
    el("#clear").onclick = clearAll;

    // Add click event to reset button
    el("#reset").onclick = function () {
        window.location = window.location;
    };

}());