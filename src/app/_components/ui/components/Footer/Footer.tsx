import { commonLabels, footerLabels } from "@/app/constants";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faDiscord,
  faGithub,
  faLinkedin,
  faMedium,
  faTelegram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.scss";
import { Container } from "../../styledComponents/Container.styled";

const Footer = () => {
  const iconMapping: { [key: string]: IconProp } = {
    faTwitter,
    faGithub,
    faDiscord,
    faMedium,
    faTelegram,
    faYoutube,
    faLinkedin,
  };

  return (
    <footer className={styles.footerContainer}>
      <Container className={`${styles.footerSubContainer}`}>
        <div className={styles.footerContent}>
          <div className={styles.left}>
            <div className={styles.poweredBy}>
              <h2 className={styles.heading}>{footerLabels.poweredBy}</h2>
              <Link
                target="_blank"
                href={footerLabels.dapplookerRoute}
              >
                <Image
                  width={194}
                  height={44}
                  className={styles.dapplookerIcon}
                  alt="Dapplooker Icon"
                  src={`${commonLabels.CLOUDFRONT_BASE_URL}/assets/svg/updated-dapplooker-logo-with-text.svg`}
                ></Image>
              </Link>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.socialLinksContainer}>
              <h2 className={styles.heading}>{footerLabels.joinUs}</h2>
              <ul className={styles.socailLinks}>
                {footerLabels.socialLinks.map((tab) => (
                  <li key={tab.tabName}>
                    <Link
                      href={tab.tabLink}
                      target="_blank"
                      className={styles.socialLink}
                    >
                      <FontAwesomeIcon
                        className={styles.icon}
                        icon={iconMapping[tab.tabName]}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <hr className={styles.divider} />
      </Container>
    </footer>
  );
};

export default Footer;
