
import style from "./page.module.css";
import Image from "next/image";
import starIcon from "@/public/category_icons/0_star_icon.png"
import { redirect } from "next/navigation";
import Switch from "@/src/components/basic/switch/Switch";
import Button from "@/src/components/basic/button/Button";
import Menu from "@/src/components/menu/Menu";
import { logOutAction } from "@/src/lib/actions/authActions";

export default function Page() {

  const loadCategories = async () => {
    "use server"
    redirect("/categories");
  }

  const loadSubscriptions = async () => {
    "use server"
    redirect("/subscriptions");
  }

  return (
    <div className={style.page}>
      <h1 className={style.title}>Settings</h1>
      <section className={style.darkMode}>
        Dark mode
        <Switch checkboxId="checkbox1" callback={async () => {"use server"}} defaulSwitchColor={"rgb(255, 255, 255)"} defaultNobColor={"rgb(0, 0, 0)"}  activeSwitchColor={"#65558F"} activeNobColor={"rgb(255, 255, 255)"}></Switch>
      </section> 
      
      <h2 className={style.subTitle}>Account</h2>
      <section className={style.accountSection}>
        <p className={style.email}>Email <span>email@gmail.con</span></p>
        <p className={style.username}>Username <span>username123</span></p>
        <Button attributes={{onClick: logOutAction, className: style.logout}}>Log out</Button>
      </section>

      <div className={style.buttonsWrapper}>
        <Button attributes={{ className: style.categories, onClick: loadCategories}}>
          <Image src={starIcon} alt={"star icon"}></Image>
          Categories
        </Button>

        <Button attributes={{className: style.subscriptions, onClick: loadSubscriptions}}>
          <Image src={starIcon} alt={"star icon"}></Image>
          Subscriptions
        </Button>
      </div>

      <Menu isInHome={false}></Menu>
    </div>
  );
}