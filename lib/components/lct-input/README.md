# LctInput

LctInput 不是一个直接使用的表单控件, LctInput 是表单的结构组件, 更直白点讲, 是其他表单组件的容器.

## 作用

LctInput 是所有表单组件的基础容器组件, 预先定义了表单组件应当拥有的 Slots 与布局, 并可以提供表单验证功能和 require 提示.

## 结构 (Slot)

LctInput 包含三个 Slot, 分别为 `default`, `icon`, `message`.

 - default: 默认 Slot, 用于存放控件本身.
 - icon: 用于存放控件的图标.
 - message: 用于存放消息提醒节点, 如 label 与 errorMessage.

## 编写一个表单组件

在编写表单组件时, 应当配套使用 LctInput 使用, 从而在标准结构内实现功能.

请查阅 LctTextfield 等组件代码, 查看这些组件如何使用 LctInput 进行布局.

## 设置一个表单组件为必填项

如果你希望写一个组件的输入为必填, 请做如下两件事情:

 - LctInput 传入 required;
 - LctInput 传入 value, 此值应当是所编写组件的 modelValue, 以便校验用户是否真的输入内容.

当以上两者都传入后, 表单组件将带有必填功能, 当用户没有填写内容提交时, 将弹出浏览器的原生填写提醒.
