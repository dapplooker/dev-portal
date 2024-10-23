"use client";
import React from "react";
import Link from "next/link";
import env from "@/app/constants/common/labels";
import { commonLabels } from "@/app/constants";
import styles from "./SelectNetwork.module.scss";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "../../shadecn/ui/Dialog";

interface SelectNetworkModalProps {
  protocol:any
}
function SelectNetworkModal({protocol}:SelectNetworkModalProps) {
  const networksList = commonLabels.networksList;
  return (
    <Dialog>
      <DialogTrigger className={styles.networkTrigger}>
        <img
          className={styles.networkImage}
          src={`${commonLabels.CLOUDFRONT_BASE_URL}${protocol.img}`}
          alt=""
        />
        Select Network
      </DialogTrigger>
      <DialogContent className="w-fit h-fit bg-transparent">
      <div className={styles.selectNetworkModalContainer}>
          <ul className={styles.networksList}>
            {networksList.map((network, index) => (
              <li key={index} className={styles.listItem}>
                <Link
                  href={env.MODE === "production" ? network.route : network.localRoute}
                  className={styles.networkButton}
                >
                  <DialogClose asChild>
                    <div>
                      <div className={styles.imageContainer}>
                        <img
                          className={styles.image}
                          src={`${commonLabels.CLOUDFRONT_BASE_URL}${network.src}`}
                          alt={`${network.title} image`}
                        />
                      </div>
                      <p className={styles.title}>{network.title}</p>
                    </div>
                  </DialogClose>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SelectNetworkModal;
