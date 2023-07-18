import Link from 'next/link';

const SocialLinks = () => {
  return (
    <div className="social-links">
      <Link href="https://instagram.com/brightonrope" target="_blank">
        <i className="fa-brands fa-instagram"></i>
      </Link>
      <Link href="https://fetlife.com/users/4003588" target="_blank">
        <img src="images/FetlifeLogo.png" />
      </Link>

      <Link href="https://discord.gg/3RdshrDXr6" target="_blank">
        <i className="fa-brands fa-discord"></i>
      </Link>
    </div>
  );
};

export default SocialLinks;
