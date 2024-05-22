import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
export default function PrimaryButton({ className = '', disabled, children, ...props }) {
    return (
        <div>
            <label>
                Phone number:
                <PhoneInput 
                
                    country={'us'}
                    value=''
                    
                
                />
            </label>
        </div>
    );
}
