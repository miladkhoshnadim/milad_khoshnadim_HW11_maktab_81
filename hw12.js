////////

const div = document.createElement("div");
div.innerHTML = "LODING .....";
div.classList.add("loding");

document.getElementById("closepage").addEventListener("click", function () {
  document.getElementById("sectiontodo").classList.add("Nvisibel");
  document.getElementById("sectionhome").classList.add("Nvisibel");
});

document.getElementById("pagehome").addEventListener("click", pageHomee);
document.getElementById("imagehome").addEventListener("click", pageHomee);
document.getElementById("imageleft").addEventListener("click", pageHomee);
function pageHomee() {
  document.getElementById("sectiontodo").classList.add("Nvisibel");
  document.getElementById("sectionhome").classList.remove("Nvisibel");
  document.getElementById("pagination").classList.add("Nvisibel");
  document.getElementById("titelpage").innerHTML = "HOME";
}
document.getElementById("imageright").addEventListener("click", pagetodos );
document.getElementById("pagetodos").addEventListener("click",pagetodos );
function pagetodos () {
  document.getElementById("sectionhome").classList.add("Nvisibel");
  document.getElementById("sectiontodo").classList.remove("Nvisibel");
  document.getElementById("pagination").classList.remove("Nvisibel");
  document.getElementById("titelpage").innerHTML = "TODOs";
}

window.addEventListener("load", (event) => {
  const sectiontodo = document.getElementById("sectiontodo");
  sectiontodo.append(div);
  gettodolist();
});

function gettodolist() {
  fetch(`https://6347ed87db76843976b5ffa0.mockapi.io/hw12todo`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(` not fund (${response.status})`);
      }

      return response.json();
    })
    .then((data) => {
      div.remove();
      console.log(data);
      const sectiontodo = document.getElementById("sectiontodo");
      sectiontodo.innerHTML = "";
      creatBox(data);
    })
    .catch((err) => {
      document.getElementById("sucssesfully").classList.remove("Nvisibel");
      document.getElementById("strongError").innerHTML = `ERROR`;
      document.getElementById(
        "ParagraghError"
      ).innerHTML = `there are very problem in your cod >>>>${err}`;
      console.error(`Something went wrong Mr Milad_KHoshnadim =>>> ${err}`);
    })
    .finally(() => {
      console.log("end of fetching");
    });
}

document.getElementById("submit").addEventListener("click", function () {
  const inputTitel = document.getElementById("inputTitel").value;
  const inpudescrip = document.getElementById("inpudescrip").value;
  const inpudate = document.getElementById("inpudate").value;
  const rightNow = today();
  if (inputTitel && inpudate) {
    fetch(`https://6347ed87db76843976b5ffa0.mockapi.io/hw12todo`, {
      method: "post",
      body: JSON.stringify({
        title: `${inputTitel}`,
        description: `${inpudescrip}`,
        dueDate: `${inpudate}`,
        checked: false,
        createdAt: `${rightNow} `,
        updateAt: `${rightNow} `,
      }),
      headers: { "Content-Type": "Application/json" },
    }).then(() => {
      gettodolist();
      document.getElementById("sucssesfully").classList.remove("Nvisibel");
      // document.getElementById("inputTitel").classList.remove("redBorder");
      // document.getElementById("inpudate").classList.remove("redBorder");
    });
  } else {
    redborderHandel();
  }
  document.getElementById("inputTitel").value = "";
  document.getElementById("inpudescrip").value = "";
  document.getElementById("inpudate").value = "";
  document.getElementById("submit").innerHTML = "submit";
});

function deletTodo(id) {
  // console.log("!@#e", id);
  // console.log("!@#e", e.id);
  document.getElementById("deletBlock").classList.remove("Nvisibel");
  /***/ ///////////////////////////// */
  fetch(`https://6347ed87db76843976b5ffa0.mockapi.io/hw12todo`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      data.forEach((ele) => {
        if (ele.id == id) {
          document.getElementById("titels").innerHTML = `${ele.title}`;
          document.getElementById(
            "disciption"
          ).innerHTML = `${ele.description}`;
          document.getElementById("datasDelet").innerHTML = `${ele.dueDate}`;
        }
      });
    });

  /**/ //////////////////////// */
  document.getElementById("bootendelet").addEventListener("click", function () {
    fetch(`https://6347ed87db76843976b5ffa0.mockapi.io/hw12todo/${id}`, {
      method: "delete",
      headers: { "Content-Type": "Application/json" },
    }).then(() => {
      gettodolist();
      document.getElementById("deletBlock").classList.add("Nvisibel");
    });
  });

  document
    .getElementById("bootencancel")
    .addEventListener("click", function () {
      document.getElementById("deletBlock").classList.add("Nvisibel");
    });
}

function checkboxHandel(event) {
  fetch(
    `https://6347ed87db76843976b5ffa0.mockapi.io/hw12todo/${event.target.id}`,
    {
      method: "PUT",
      body: JSON.stringify({ checked: event.target.checked }),
      headers: { "Content-Type": "Application/json" },
    }
  );
}

function handelMosedelet(div, id) {
  div.onmouseover = function () {
    // console.log(id);
    document.getElementById(`mody${id}`).classList.remove("Nvisibel");
    document.getElementById(`trash${id}`).classList.remove("Nvisibel");
  };
  div.onmouseout = function () {
    document.getElementById(`mody${id}`).classList.add("Nvisibel");
    document.getElementById(`trash${id}`).classList.add("Nvisibel");
  };
}

function modifyTodo(id) {
  document.getElementById("submit").classList.add("Nvisibel");
  document.getElementById("Save").classList.remove("Nvisibel");
  document.getElementById("sectiontodo").classList.add("Nvisibel");
  document.getElementById("sectionhome").classList.remove("Nvisibel");
  document.getElementById("pagination").classList.add("Nvisibel");
  document.getElementById("titelpage").innerHTML = "HOME";
  document.getElementById(
    "inputUrl"
  ).value = `https://6347ed87db76843976b5ffa0.mockapi.io/hw12todo/${id}`;
  fetch(`https://6347ed87db76843976b5ffa0.mockapi.io/hw12todo`)
    .then((response) => {
      if (response.status == 404) {
        throw new Error(` not fund (${response.status})`);
      }
      return response.json();
    })
    .then((data) => {
      data.forEach((ele) => {
        if (ele.id == id) {
          document.getElementById("inputTitel").value = `${ele.title}`;
          document.getElementById("inpudescrip").value = `${ele.description}`;
          document.getElementById("inpudate").value = `${ele.dueDate}`;
          document
            .getElementById("Save")
            .addEventListener("click", function () {
              const modyTitel = document.getElementById("inputTitel").value;
              const modydescrip = document.getElementById("inpudescrip").value;
              const modydate = document.getElementById("inpudate").value;
              const modyrightNow = today();
              // console.log("modyrightNow", modyrightNow);
              // console.log("!@#", modyTitel, modydate, ele.createdAt, id);
              if (modyTitel && modydate) {
                fetch(
                  `https://6347ed87db76843976b5ffa0.mockapi.io/hw12todo/${id}`,
                  {
                    method: "put",
                    body: JSON.stringify({
                      title: `${modyTitel}`,
                      description: `${modydescrip}`,
                      dueDate: `${modydate}`,
                      checked: `${ele.checked}`,
                      createdAt: `${ele.createdAt} `,
                      updateAt: `${modyrightNow} `,
                    }),
                    headers: { "Content-Type": "Application/json" },
                  }
                )
                  .then(() => {
                    // console.log('response', response)
                    // if (response.status == 404) {
                    //   throw new Error(` not fund (${response.status})`);
                    // }
                    document.getElementById("inputTitel").value = "";
                    document.getElementById("inpudescrip").value = "";
                    document.getElementById("inpudate").value = "";
                    gettodolist();
                    document.getElementById(
                      "strongError"
                    ).innerHTML = `Sucssesfull`;
                    document.getElementById(
                      "ParagraghError"
                    ).innerHTML = `The todos sucssesfully submitted.`;
                    document
                      .getElementById("sucssesfully")
                      .classList.remove("Nvisibel");
                  })
                  // .catch((err) => {
                  //   document
                  //     .getElementById("sucssesfully")
                  //     .classList.remove("Nvisibel");
                  //   document.getElementById("strongError").innerHTML = `ERROR`;
                  //   document.getElementById(
                  //     "ParagraghError"
                  //   ).innerHTML = `there are very problem in your cod agha milad >>>>${err}`;
                  //   console.error(
                  //     `Something went wrong in line 225 =>>> ${err}`
                  //   );
                  // })

                  .finally(() => {
                    document
                      .getElementById("submit")
                      .classList.remove("Nvisibel");
                    document.getElementById("Save").classList.add("Nvisibel");
                    document.getElementById("inputUrl").value = "";
                  });
              } else {
                redborderHandel();
              }
            });
        }
      });
    })
    .catch((err) => {
      document.getElementById("sucssesfully").classList.remove("Nvisibel");
      document.getElementById("strongError").innerHTML = `ERROR`;
      document.getElementById(
        "ParagraghError"
      ).innerHTML = `there are very problem in your cod >>>>${err}`;
      console.error(`Something went wrong  in line 249 =>>> ${err}`);
    });
}

document.getElementById("CloseSucsess").addEventListener("click", function () {
  document.getElementById("sucssesfully").classList.add("Nvisibel");
});

function redborderHandel() {
  document.getElementById("inputTitel").classList.add("redBorder");
  document.getElementById("inpudate").classList.add("redBorder");
  setTimeout(() => {
    document.getElementById("inputTitel").classList.remove("redBorder");
    document.getElementById("inpudate").classList.remove("redBorder");
  }, "3000");
  setTimeout(() => {
    alert("please fill titel and Dat !!!hatman!!!");
  }, "1000");
}

function today() {
  const day = new Date();
  const dd = String(day.getDate()).padStart(2, "0");
  const mm = String(day.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = day.getFullYear();
  return mm + "/" + dd + "/" + yyyy;
  console.log(mm + "/" + dd + "/" + yyyy);
}

function creatBox(data) {
  const list_items = data;

  ///////////////////////////handel search bar
  document.getElementById("searching").addEventListener("input", (e) => {
    let serch_items = [];
    list_items.forEach((elem) => {
      if(elem.title.toLowerCase().includes(e.target.value.toLowerCase())){
        serch_items.push(elem);
      } else if(elem.description.toLowerCase().includes(e.target.value.toLowerCase())){
        serch_items.push(elem);
      }else if(elem.dueDate.toLowerCase().includes(e.target.value.toLowerCase())){
        serch_items.push(elem);
      }
      });
    DisplayList(serch_items, list_elem, rows, currentPage);
  });
  ///////////////////////////pagination function

  const list_elem = document.getElementById("sectiontodo");
  const pagination_elem = document.getElementById("pagination");
  // console.log(" ss", list_elem, pagination_elem);
  let currentPage = 1;
  let rows = 5;
  function DisplayList(items, wrapper, rows_per_page, page) {
    wrapper.innerHTML = "";
    page--;

    let start = rows_per_page * page;
    let end = start + rows_per_page;
    let paginatedItems = items.slice(start, end);
    for (let i = 0; i < paginatedItems.length; i++) {
      const element = paginatedItems[i];
      const div = document.createElement("div");
      let check = "";
      div.classList.add("divtodo");
      div.setAttribute("id", `${element.id}`);
      if (element.checked) {
        check = "checked";
      }
      div.innerHTML = `<img onclick="modifyTodo(${element.id})" id='mody${element.id}' width="30px" height="30px" class="modifyimage Nvisibel" src="modify.png" alt="">
                  <img onclick="deletTodo(${element.id})" id='trash${element.id}' width="30px" height="30px" class="trashimage Nvisibel" src="trash.png" alt="">
                  <input  id="${element.id}" onchange="checkboxHandel(event)" type="checkbox" ${check} />
                  <span class="title">${element.title}</span>
                  <span class="date">${element.dueDate}</span>
                  <p>${element.description}</p>`;

      wrapper.appendChild(div);
      handelMosedelet(div, element.id);
    }
  }

  function setupPagination(items, wrapper, rows_per_page) {
    wrapper.innerHTML = "";

    let pageCount = Math.ceil(items.length / rows_per_page);
    for (let i = 1; i < pageCount + 1; i++) {
      let btn = paginationBtn(i, items);
      wrapper.appendChild(btn);
    }
  }

  function paginationBtn(page, items) {
    let button = document.createElement("button");
    button.innerHTML = page;
    if (currentPage == page) {
      button.classList.add("active");
    }
    button.addEventListener("click", function () {
      currentPage = page;
      DisplayList(items, list_elem, rows, currentPage);

      let currentBtn = document.querySelector(".pagenumber button.active");
      // console.log(currentBtn);
      currentBtn.classList.remove("active");

      this.classList.add("active");
    });

    return button;
  }

  // console.log("!@#", list_items, list_elem, rows, currentPage);
  DisplayList(list_items, list_elem, rows, currentPage);
  setupPagination(list_items, pagination_elem, rows);
}
