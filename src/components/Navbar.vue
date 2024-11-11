<template>
  <header class="top-navbar">
		<nav class="navbar navbar-expand-lg navbar-light bg-light">
			<div class="container">
				<a class="navbar-brand" href="/">
					<img src="../../public/images/logoResto.png" alt="" width="200px" />
				</a>
				<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbars-rs-food" aria-controls="navbars-rs-food" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbars-rs-food">
					<ul class="navbar-nav ml-auto">
						<li class="nav-item active"><a class="nav-link" href="/">Home</a></li>
						<li class="nav-item"><a class="nav-link" href="#">Breakfast</a></li>
						<li class="nav-item"><a class="nav-link" href="#">Lunch</a></li>
						<li class="nav-item dropdown">
							<a class="nav-link dropdown-toggle" href="#" id="dropdown-a" data-toggle="dropdown">Drink</a>
							<div class="dropdown-menu" aria-labelledby="dropdown-a">
								<a class="dropdown-item" href="#">Cocktails</a>
								<a class="dropdown-item" href="#">Tea</a>
							</div>
						</li>
						<!-- <li class="nav-item dropdown">
							<a class="nav-link dropdown-toggle" href="#" id="dropdown-a" data-toggle="dropdown">Blog</a>
							<div class="dropdown-menu" aria-labelledby="dropdown-a">
								<a class="dropdown-item" href="blog.html">blog</a>
								<a class="dropdown-item" href="/blogdetail">blog Single</a>
							</div>
						</li> -->
						<li class="nav-item"><a class="nav-link" href="/blogdetail">Blog Details</a></li>
						<li class="nav-item"><a class="nav-link" href="#">Contact</a></li>
                        <li class="nav-item"><a class="nav-link" href="/management">Management</a></li>
					</ul>
                    <ul class="navbar-nav">
                        <li class="nav-item ml-auto">
                        <a class="nav-link" href="/login">Login</a>
                        </li>
                    </ul>
				</div>
			</div>
		</nav>
	</header>
</template>

<script>
export default {
    name:'NabBar',
}
</script>

<style>

</style>