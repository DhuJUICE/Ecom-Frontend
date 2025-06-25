import ImageKit from "imagekit-javascript";

const imagekit = new ImageKit({
  publicKey: "public_tCW7CHgWHSo+4XkVnYMOlCKMu9Q=",       // from ImageKit dashboard
  urlEndpoint: "https://ik.imagekit.io/jugamsoft", // from ImageKit dashboard
  authenticationEndpoint: "https://yummytummies-backend2.onrender.com/api/imagekit/auth"  // optional if you want secure uploads
});

export default imagekit;