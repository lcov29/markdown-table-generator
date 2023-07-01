# **Documentation**
<br>
<br>

## **Table Of Contents**
<br>

- [**Documentation**](#documentation)
  - [**Table Of Contents**](#table-of-contents)
  - [**Requirements**](#requirements)
    - [**Wireframe**](#wireframe)
    - [**Use Case Diagram**](#use-case-diagram)
  - [**Implementation**](#implementation)
    - [**Overview**](#overview)
    - [**Internal Table Model**](#internal-table-model)
      - [**Class Diagram**](#class-diagram)
      - [**Internal Table Representation**](#internal-table-representation)
      - [**Types**](#types)
        - [**TitleContent**](#titlecontent)
        - [**TextContent**](#textcontent)
        - [**ImageContent**](#imagecontent)
        - [**ColumnAlignmentOption**](#columnalignmentoption)
        - [**LinkTargetOption**](#linktargetoption)

<br>
<br>
<br>
<br>

## **Requirements**
<br>
<br>
<br> 

### **Wireframe**
<br>

![Wireframe](wireframe/wireframe.svg)

<br>
<br>
<br>

### **Use Case Diagram**
<br>

![Use Case Diagram](use-case-diagram/use-case-diagram.svg)

<br>
<br>
<br>
<br>

## **Implementation**
<br>
<br>
<br>

### **Overview**
<br>


```mermaid
flowchart TB
  a[App.tsx] --> b[InternalTableModel.ts]
  a --> c[LandingPage.tsx]
  a --> d[MarkdownInputPage.tsx]
  d --> z[MarkdownValidator.ts]
  d --> y[parseMarkdownToInternalTable.ts]
  a --> e[MarkdownOutputPage.tsx]
  a --> f[TableDimensionInputPage.tsx]
  f --> x[parseInternalTableToMarkdown.ts]
  a --> g[TableEditorPage.tsx]
  f --> h[TablePreview.tsx]
  g --> i[TableEditor.tsx]
  i --> j[structure]
  i --> k[content]
```


**Table Data Flow:**
```mermaid
flowchart LR
    a[TableEditor]
    b[InternalTableModel]
    c[Markdown Table]
    a -- update --> b
    b -- initialize --> a
    c -- parsing --> b
    b -- parsing --> c
```

<br>
<br>
<br>

### **Internal Table Model**
<br>
<br>

#### **Class Diagram**
<br>

```mermaid

classDiagram
    class InternalTableModel {
        -table: [null | TitleContent | TextContent | ImageContent | LinkContent][][]
        -rowCount: number
        -columnCount: number

        +constructor(rowNumber?: number, columnNumber?: number)
        +getTableClone()
        +parseMarkdownInput(input: string)
        +addRowAt(index: number)
        +addColumnAt(index: number)
        +removeRowAt(index: number)
        +removeColumnAt(index: number)
        +swapRows(row1Index: number, row2Index: number)
        +swapColumns(column1Index: number, column2Index: number)
        +getContentAt(position: [rowIndex: number, columnIndex: number])
        +addContentAt(position: [rowIndex: number, columnIndex: number], content: TextContent | ImageContent[])
        +removeContentAt(position: [rowIndex: number, columnIndex: number])
        +swapContent(content1: [rowIndex: number, columnIndex: number], content2: [rowIndex: number, columnIndex: number])
        -initializeTable(rowTotal: number, columnTotal: number)
        -isValidPosition(position: [rowIndex: number, columnIndex: number])
    }

```

<br>
<br>
<br>

#### **Internal Table Representation**
<br>

The table is internally represented as a zero based two-dimensional array.

<br>

```mermaid
flowchart BT
    a[RowArray] --> z[TableArray]
    b[RowArray] --> z[TableArray]
    c[RowArray] --> z[TableArray]
    d[TitleContent] --> a
    e[TextContent] --> b
    f[ImageContent] --> b
    g[LinkContent] --> b
    h[TextContent] --> c
    i[ImageContent] --> c
    j[LinkContent] --> c
```

<br>

The first row array holds references to [TitleContent](#titlecontent) objects.

All subsequent arrays can hold references to either [TextContent](#textcontent), [ImageContent](#imagecontent) or [LinkContent](#linkcontent) objects. Empty cells are represented by _Null_ reference.

<br>
<br>

Example:

<br>

|Index |0            |1            |2            |3            |
|:----:|:-----------:|:-----------:|:-----------:|:-----------:|
|0     |TitleContent |TitleContent |TitleContent |TitleContent |
|1     |TextContent  |Null         |ImageContent |Null         |
|2     |Null         |Null         |Null         |TextContent  |

<br>
<br>
<br>

#### **Types**
<br>
<br>

##### **TitleContent**
<br>

```typescript
type TitleContent = {
   type: 'title',
   title: string,
   columnAlignment: ColumnAlignmentOption
};
```

<br>
<br>

##### **TextContent**
<br>

```typescript
type TextContent = {
   type: 'text',
   text: string,
   isLink: boolean,
   href: string,
   target: LinkTargetOption,
   title: string
};
```

<br>
<br>

##### **ImageContent**
<br>

```typescript
type ImageContent = {
   type: 'image',
   src: string,
   alt: string,
   width: string,
   height: string,
   title: string,
   isLink: boolean,
   href: string,
   target: LinkTargetOption
};
```

<br>
<br>

##### **ColumnAlignmentOption**
<br>

```typescript
type ColumnAlignmentOption = 'left' | 'right' | 'center';
```

<br>
<br>

##### **LinkTargetOption**
<br>

```typescript
type LinkTargetOption = '_blank' | '_parent' | '';
```