import quizIcon from "./images/quiz.png";
import { Input } from "@/components/ui/input"
import "./input.css";

const Header=()=>{
    return(
        <div className="bg-violet-400 border-gray-200 dark:bg-gray-900">
            <div className="flex flex-wrap items-center justify-between  p-4">
                <p className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={quizIcon} className="h-8" alt="Quiz App" />
                    <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Quiz App</span>
                </p>
                <div>
                    <Input type="text" placeholder="search" className="w-96 h-10"/>
                </div>      
            </div>
        </div>
    )
};

export default Header;