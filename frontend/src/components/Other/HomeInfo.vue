<template>
  <div class="info-wrapper">
    <div class="info-content">
      <h3 class="header">Blog<span> ~ </span>Collect<span> ~ </span> Like</h3>
      <p>Bloglist is the ultimate social blog listing site!</p>
      <p>Ýou can add blogs, list them and like em to your hearts content.</p>
      <br />
      <p><strong>Are you the ultimate like master?</strong></p>
      <p>Share millions of users your favorite blogs, gather likes and win... ?!?!</p>
    </div>
  </div>
  <footer>
    <p>This website is a quick demo project to learn the basics of Vue and Sequelize+Postresql</p>
  </footer>
</template>

<style scoped>
   .info-wrapper {
    width: 100%;
    min-width: 100vw;
    background-color: white;
    color:  black;
    padding: var(--padding-main) 0 200px;
  }

  .info-content {
    margin: 0 auto;
    padding: 0 16px;
    max-width: var(--content-max-width);
    text-align: center;

    & strong {
      color: var(--color-secondary);
      font-size: 1.1rem;
    }

    & p {
      font-family: 'Gantari', sans-serif;
    }

    & h3 {
      color: var(--color-secondary);
      font-size: calc(1.7rem + 1vw);
      padding-bottom: var(--padding-main);

      & span {
        font-size: calc(1rem + 1vw);
        color: black;
      }
    }
  }

  footer {
    background-color: white;
    width: 100%;
    text-align: center;
    color: var(--color-primary);
    padding-bottom: 16px;
  }
</style>