import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, ToggleControl, SelectControl } from "@wordpress/components";

const Inspector = (props) => {
	const { attributes, setAttributes } = props;
	const { parent_only, alternate_layout, order, orderBy } = attributes;

	return (
		<InspectorControls>
			<PanelBody title="Danh mục">
				<ToggleControl
					label="Chỉ hiện danh mục cha"
					checked={parent_only}
					onChange={(value) => setAttributes({ parent_only: value })}
					help="Bật để chỉ lấy các danh mục cấp 1 (không có danh mục cha)."
				/>
				<ToggleControl
					label="Đảo chiều ảnh xen kẽ"
					checked={alternate_layout}
					onChange={(value) => setAttributes({ alternate_layout: value })}
					help="Bật để ảnh các card chẵn hiển thị bên trái thay vì bên phải."
				/>
			</PanelBody>
			<PanelBody title="Sắp xếp">
				<SelectControl
					label="Sắp xếp theo"
					value={orderBy}
					options={[
						{ label: "Thứ tự tuỳ chỉnh (term_order)", value: "term_order" },
						{ label: "Tên (A–Z)", value: "name" },
						{ label: "ID", value: "id" },
						{ label: "Số bài viết", value: "count" },
					]}
					onChange={(value) => setAttributes({ orderBy: value })}
				/>
				<SelectControl
					label="Chiều sắp xếp"
					value={order}
					options={[
						{ label: "Tăng dần (ASC)", value: "asc" },
						{ label: "Giảm dần (DESC)", value: "desc" },
					]}
					onChange={(value) => setAttributes({ order: value })}
				/>
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;
