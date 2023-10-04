import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className=" min-h-screen flex flex-col mx-6 lg:mx-12 mb-6">
        <div className="mt-4 mx-4">
          <p className="text-lg md:text-xl font-semibold text-justify text-slate-100">
            Welcome to SktVault - Your Ultimate Secure Cloud Storage Solution!{" "}
            <br /> Are you looking for a reliable and secure cloud storage
            service? Look no further! SkyVault is the perfect solution for all
            your data storage needs. Our platform offers a range of cutting-edge
            features to ensure your files are safe, accessible, and available
            whenever you need them.
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-center md:justify-center items-center mt-4 md:mt-6 w-full p-2 bg-slate-700 bg-opacity-70 rounded-lg">
          <img
            className=" object-cover md:mr-4 lg:mr-8 h-56 w-5/6 md:w-1/4"
            src="client_encryption.jpg"
            alt="SkyVault Logo"
          />
          <div className=" text-base text-justify md:text-lg text-slate-100 mt-2 md:mt-0 w-5/6 md:w-4/6">
            <span className=" font-semibold">Client-Side Encryption:</span> We
            understand the importance of privacy and data security. That's why
            we have implement state-of-the-art client-side encryption to
            safeguard your data even before it leaves your device. With
            client-side encryption, your files are encrypted locally, and you
            hold the encryption keys. This means that no one else, not even
            SkyVault, can access your files without your permission. This level
            of security ensures that your sensitive data remains protected from
            unauthorized access.
          </div>
        </div>
        <div className="flex flex-col-reverse md:flex-row justify-center md:justify-center items-center mt-4 md:mt-6 w-full p-2 bg-slate-700 bg-opacity-70 rounded-lg">
          <div className=" text-base text-justify md:text-lg text-slate-100 mt-2 md:mr-4 lg:mr-8 md:mt-0 w-5/6 md:w-4/6">
            <span className=" font-semibold">Server-Side Encryption:</span> In
            addition to client-side encryption, we employ server-side encryption
            with advanced encryption standards. Your files are protected with
            multiple layers of security, providing an extra level of assurance
            for your sensitive data. This dual-layered encryption approach
            ensures that even in the unlikely event of a breach, your data
            remains secure.
          </div>
          <img
            className=" object-cover h-56 w-4/6 md:w-1/4"
            src="server_encryption.jpg"
            alt="SkyVault Logo"
          />
        </div>
        <div className="flex flex-col md:flex-row justify-center md:justify-center items-center mt-4 md:mt-6 w-full p-2 bg-slate-700 bg-opacity-70 rounded-lg">
          <img
            className=" object-cover md:mr-4 lg:mr-8 h-56 w-4/6 md:w-1/4"
            src="aws.png"
            alt="SkyVault Logo"
          />
          <div className=" text-base text-justify md:text-lg text-slate-100 mt-2 md:mt-0 w-5/6 md:w-4/6">
            <span className=" font-semibold">Fast Access with AWS S3:</span> We
            understand the importance of speed when it comes to accessing and
            managing your files. That's why we use Amazon Web Services (AWS) to
            provide you with lightning-fast access to your data. By leveraging
            AWS S3 buckets, we ensure blazingly fast upload and download speeds,
            making file management a breeze.
          </div>
        </div>
        <div className="flex flex-col-reverse md:flex-row justify-center md:justify-center items-center mt-4 md:mt-6 w-full p-2 bg-slate-700 bg-opacity-70 rounded-lg">
          <div className=" text-base text-justify md:text-lg text-slate-100 mt-2 md:mr-4 lg:mr-8 md:mt-0 w-5/6 md:w-4/6">
            <span className=" font-semibold">Responsive Web Design:</span> At
            SkyVault, we want you to access your files whenever and wherever you
            need them. Our responsive web design ensures that our platform works
            flawlessly across all devices, whether you're using a desktop,
            laptop, tablet, or smartphone. You can easily access and manage your
            files on the go without any hiccups.
          </div>
          <img
            className=" object-cover h-56 w-4/6 md:w-1/4"
            src="responsive.jpg"
            alt="SkyVault Logo"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
