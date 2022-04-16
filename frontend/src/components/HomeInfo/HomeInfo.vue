<template>
	<div class="info-wrapper">
    <div class="info-content">
      <h3 class="header">Blog <span>-</span> Collect <span>-</span> Like</h3>
      <p>Bloglist is the ultimate social blog listing site!</p>
      <p>Ýou can add blogs, list them and like em to your hearts content.</p>
      <br />
      <p>Are you the ultimate like master?</p>
      <p>Share millions of users your favorite blogs, gather likes and win... nothing?</p>
    </div>
  </div>
</template>

<style scoped>
	 .info-wrapper {
    height: 600px;
    width: 100vw;
    background-color: white;
    color:  black;
    padding: var(--padding-main) 0;
  }

  .info-content {
    margin: 0 auto;
    padding: 0 16px;
    max-width: var(--content-max-width);
    text-align: center;

    & h3 {
    	color: var(--color-secondary);
  		font-size: calc(1.5rem + 1vw);
  		padding-bottom: var(--padding-main);

  		& span {
  			font-size: calc(1.5rem + 1vw);
  			color: black;
  		}
    }
  }
</style>