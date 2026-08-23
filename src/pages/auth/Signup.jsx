import { useState } from "react";
import { Eye, EyeOff, LockKeyhole, Mail, User } from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function SignupPage() {
	const { setCurrentPage, t } = useApp();
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const handleSubmit = (event) => {
		event.preventDefault();
		setCurrentPage("home");
	};

	return (
		<section className="min-h-[60vh] flex items-center justify-center px-4 py-12">
			<div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 shadow-lg p-6 sm:p-8">
				<div className="text-center mb-8">
					<h1 className="text-2xl font-bold text-slate-900 dark:text-white">
						{t("signUp")}
					</h1>
					<p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
						Join the Terai Times community
					</p>
				</div>

				<form onSubmit={handleSubmit} className="space-y-5">
					<label className="block">
						<span className="text-sm font-medium text-slate-700 dark:text-slate-300">
							Full name
						</span>
						<div className="mt-2 flex items-center gap-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 px-3 py-2.5">
							<User size={17} className="text-slate-400" />
							<input
								type="text"
								required
								className="min-w-0 flex-1 bg-transparent text-sm text-slate-900 dark:text-white outline-none"
								placeholder="Your name"
							/>
						</div>
					</label>

					<label className="block">
						<span className="text-sm font-medium text-slate-700 dark:text-slate-300">
							Email
						</span>
						<div className="mt-2 flex items-center gap-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 px-3 py-2.5">
							<Mail size={17} className="text-slate-400" />
							<input
								type="email"
								required
								className="min-w-0 flex-1 bg-transparent text-sm text-slate-900 dark:text-white outline-none"
								placeholder="you@example.com"
							/>
						</div>
					</label>

					<PasswordField
						label="Password"
						placeholder="Create a password"
						visible={showPassword}
						onToggle={() => setShowPassword((visible) => !visible)}
					/>
					<PasswordField
						label="Confirm password"
						placeholder="Repeat your password"
						visible={showConfirmPassword}
						onToggle={() => setShowConfirmPassword((visible) => !visible)}
					/>

					<button
						type="submit"
						className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
					>
						{t("signUp")}
					</button>
				</form>
			</div>
		</section>
	);
}

function PasswordField({ label, placeholder, visible, onToggle }) {
	return (
		<label className="block">
			<span className="text-sm font-medium text-slate-700 dark:text-slate-300">
				{label}
			</span>
			<div className="mt-2 flex items-center gap-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 px-3 py-2.5">
				<LockKeyhole size={17} className="text-slate-400" />
				<input
					type={visible ? "text" : "password"}
					required
					minLength={8}
					className="min-w-0 flex-1 bg-transparent text-sm text-slate-900 dark:text-white outline-none"
					placeholder={placeholder}
				/>
				<button
					type="button"
					onClick={onToggle}
					className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
					aria-label={visible ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`}
				>
					{visible ? <EyeOff size={17} /> : <Eye size={17} />}
				</button>
			</div>
		</label>
	);
}
