
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid"
import Logo from '@/assets/Logo.png'
import { Link } from "./Link"
import { SelectedPage } from "@/shared/types"
import useMediaQuery from "@/hooks/useMediaQuery"
import { useState } from "react"
import ActionButton from "@/shared/ActionButton"


 type Props = {
    selectedPage: SelectedPage,
    isTopOfPage: boolean,
    setSelectedPage:(value: SelectedPage) => void
 }

export const Navbar = ({ selectedPage, setSelectedPage, isTopOfPage}: Props) => {
    const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false)
    const flexBetween = "flex items-center justify-between"
    const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)")
    const navbarBackground = isTopOfPage ? "" : "bg-primary-100 drop-shadow"
  return (
    <nav>
        <div
        className={`${flexBetween} ${navbarBackground} fixed  top-0 z-30 w-full py-6`}
        >
            <div className={`${flexBetween} mx-auto w-5/6`}>
                <div className={`${flexBetween} w-full gap-16`}>
                    {/* LEFT SIDE  */}
                    <img src={Logo} alt="logo" />
                    {/* RIGHT SIDE  */}
                    { isAboveMediumScreens ? <div className={`${flexBetween} w-full`}>
                        <div className={`${flexBetween} gap-8 text-sm`}>
                            <Link selectedPage={selectedPage} setSelectedPage={setSelectedPage} page="Home"/>
                            <Link selectedPage={selectedPage} setSelectedPage={setSelectedPage} page="Benefits"/>
                            <Link selectedPage={selectedPage} setSelectedPage={setSelectedPage} page="Our Classes"/>
                            <Link selectedPage={selectedPage} setSelectedPage={setSelectedPage} page="Contact Us"/>
                        </div>
                        <div className={`${flexBetween}  gap-8`}>
                            <p>Sign In</p>
                            <ActionButton setSelectedPage={setSelectedPage}>Become A Member</ActionButton>
                        </div>
                    </div> : 
                    (
                        <button className="rounded-full  bg-secondary-500 p-2"
                        onClick={() => setIsMenuToggled(!isMenuToggled)}>
                        <Bars3Icon className="h-8 w-8 text-white"/>

                        </button>
                    )}
                </div>
            </div>
        </div>
        {/* MOBILE MENU MODAL */}
        {
            !isAboveMediumScreens && isMenuToggled && (
                <div className="fixed right-0 bottom-0 z-40 h-full w-[300px] bg-primary-100
                drop-shadow-xl">
                    {/* CLOSE ICON */}
                    <div className="flex justify-end p-8 ">
                        <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
                            <XMarkIcon className="h-8 w-8 text-rose-600"/>
                        </button>
                    </div>
                    {/* MENU ITEM */}
                    <div className={`ml-[33%] flex flex-col gap-10 text-2xl `}>
                            <Link selectedPage={selectedPage} setSelectedPage={setSelectedPage} page="Home"/>
                            <Link selectedPage={selectedPage} setSelectedPage={setSelectedPage} page="Benefits"/>
                            <Link selectedPage={selectedPage} setSelectedPage={setSelectedPage} page="Our Classes"/>
                            <Link selectedPage={selectedPage} setSelectedPage={setSelectedPage} page="Contact Us"/>
                        </div>
                </div>
            )
        }
    </nav>
  )
}