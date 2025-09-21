import { useDispatch, useSelector } from "react-redux";
import { Toast, ToastContainer } from "react-bootstrap";
import { removeToast } from "@/stores/slices/toastSlice";
import { RootState } from "@/stores/store";

export function GlobalToasts() {
	const toasts = useSelector((s: RootState) => s.toast.queue);
	const dispatch = useDispatch();

	return (
		<ToastContainer position="top-end" className="p-3">
			{toasts.map((t) => (
				<Toast
					key={t.id}
					onClose={() => dispatch(removeToast(t.id))}
					autohide
					delay={3000}
				>
					<Toast.Header closeButton>
						<strong className="me-auto">Contact Manager</strong>
					</Toast.Header>
					<Toast.Body className="text-dark fw-medium p-3">{t.text}</Toast.Body>
				</Toast>
			))}
		</ToastContainer>
	);
}
