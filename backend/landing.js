module.exports = plate = `
<div style="background-color:gray;height:98vh;padding:2rem">
<h1>Welcome to the Store API</h1>
<div>
<ul style="display:grid;grid-template-columns: auto auto auto ;grid-gap:2rem">
<li>/api/auth:-
<ul >
<li>post("/register")<span style="color:blue"> REGISTER A NEW USER</span></li>
<li>post("/login")<span style="color:blue"> LOGIN USER</span></li>
<li>post("/forgot-password")<span style="color:blue"> FORGET PASSWORD</span></li>
<li>patch("/update-profile")<span style="color:blue"> UPDATE PROFILE DETAILS</span></li>
<li>patch("/reset-password")<span style="color:blue"> RESET PASSWORD</span></li>
</ul>
</li>
<li>/api/category:-
<ul>
<li>post("/create")<span style="color:blue"> CREATE A NEW CATEGORY</span></li>
<li>patch("/update/:categoryId")<span style="color:blue"> UPDATE A PRTICULAR CATEGORY</span></li>
<li>get("/")<span style="color:blue"> GET ALL CATEGORY</span></li>
<li>get("/:categoryId")<span style="color:blue"> GET SINGLE CATEGORY</span> </li>
<li>delete("/delete/:categoryId")<span style="color:blue"> DELETE CATEGORY</span></li>
</ul>
</li>
<li>/api/product:-
<ul>
<li>get("/") <span style="color:blue"> GET ALL PRODUCTS</span></li>
<li>get("/:productId") <span style="color:blue"> GET SINGLE PRODUCT</span></li>
<li>post("/create") <span style="color:blue"> CREATE PRODUCT</span></li>
<li>patch("/update/:productId") <span style="color:blue"> UPDATE PRODUCT</span></li>
<li>delete("/delete/:productId") <span style="color:blue"> DELETE PRODUCT</span></li>
</ul>
</li>
<li>/api/cart:-
<ul>
<li>post("/add") <span style="color:blue"> ADD PRODUCT TO CART</span></li>
<li>get("/view") <span style="color:blue"> GET CART PRODUCT</span></li>
<li>patch("/update") <span style="color:blue"> UPDATE CART</span></li>
<li>delete("/remove/:productId") <span style="color:blue"> DELETE CART PRODUCT</span></li>
</ul>
</li>
</ul>
</div>

<div>
<h2>Query Parameters (Products) </h2>
<ul style="display:flex;justify-content:space-evenly;">
<li>search by title:-
<ul>
<li>?title=example</li>
</ul>
</li>
<li>sort by price:-
<ul>
<li>&sortBy=price</li>
</ul>
</li>
<li>filter by category:-
<ul>
<li>&categoryId=123</li>
</ul>
</li>
</ul>
</div>
</div>
`;
