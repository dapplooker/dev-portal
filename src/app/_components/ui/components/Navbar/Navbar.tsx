/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import SelectNetworkModal from "@/app/_components/dev-portal/modals/SelectNetwork";
import { commonLabels } from "@/app/constants";
import styles from "./Navbar.module.scss";

interface NavbarProps {
  protocol: any;
}
function Navbar({ protocol }: NavbarProps) {
  return (
    <header className={styles.navbar}>
      <Link
        href={`https://dapplooker.com`}
        className={styles.brandContainer}
      >
        <img
          src={`${commonLabels.CLOUDFRONT_BASE_URL}/assets/svg/updated-dapplooker-logo-with-text.svg`}
          className="dl-logo"
          alt="DappLooker No Code Web3 Analytics"
          width="194px"
          height="44px"
        />
      </Link>
      <SelectNetworkModal protocol={protocol} />
    </header>
  );
}

export default Navbar;
