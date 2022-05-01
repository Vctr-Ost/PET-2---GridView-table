class GridView {
    /**
     * properties :
     * @param [array] _tableClass
     * @param [array] _data
     * @param [array] _attribute
     * @param [string] _element
     * @param [string] _header
     * @param [array] _headerClass
     */

    constructor() {
        this._header = '';
        this._headerClass = [];
        this._tableClass = [];
        this._element = '';
        this._data = [];
        this._attribute = [];
    }

    /**
     ** Method setHeader
     */

    setHeader(header) {
        if (typeof header === 'string' && header.trim() !== '') {
            this._header = header.trim();
            return true;
        }
        else return false;
    }


    /**
     ** Method setHeaderClass
     */

    setHeaderClass(headerClass) {
        if (typeof headerClass === 'object') {
            this._headerClass = headerClass;
            return true;
        }
        else return false;
    }


    /**
     ** Method setTableClass
     */

    setTableClass(tableClass) {
        if (typeof tableClass === 'object') {
            this._tableClass = tableClass;
            return true;
        }
        else return false;
    }


    /**
     ** Method setElement
     */

    setElement(element) {
        if (document.querySelector(element)) {
            this._element = element;
            return true;
        }
        else return false;
    }


    /**
     ** Method setData
     */

    setData(data) {
        if (typeof data === 'object') {
            this._data = data;
            return true;
        }
        else return false;
    }


    /**
     ** Method setAttribute
     */

    setAttribute(obj) {
        if (typeof obj === 'object') {
            this._attribute = obj;
            return true;
        }
        else return false;
    }


    /**
     ** Method for show GridView table
     */

    render(data) {
        this.setHeader(data.header);
        this.setHeaderClass(data.headerClass);
        this.setTableClass(data.tableClass);
        this.setElement(data.element);
        this.setData(data.dataArr);
        this.setAttribute(data.attribute);

        // showHeader
        if (this._header !== '') {
            const header = document.createElement('h2');
            header.textContent = this._header;
            this._headerClass.forEach(cssClass => {
                header.classList.add(cssClass);
            })
            document.querySelector(this._element).append(header);
        }

        // showTable
        const table = document.createElement('table');
        this._tableClass.forEach(cssClass => {
            table.classList.add(cssClass);
        })

        // tableHeader
        let trHeader = document.createElement('tr');
        for (let key in this.attribute) {
            let th = document.createElement('th');
            if (this.attribute[key].label) {
                th.textContent = this.attribute[key].label;
            }
            else {
                th.textContent = key;
            }
            trHeader.append(th);
        }
        table.append(trHeader);
        document.querySelector(this._element).append(table);

        // drawTable
        for (let i = 0; i < this._data.length; i++) {
            let tr = document.createElement('tr');
            for (let key in this._data[i]) {
                let th = document.createElement('th');
                let value = '';
                // есть ли value
                if (this._attribute[key].value) {
                    value = this._attribute[key].value(this._data[i]);
                }
                else {
                    value = this._data[i][key];
                }
                // есть ли src
                if (this._attribute[key].src) {
                    th.innerHTML = value;
                }
                else {
                    th.textContent = value;
                }
                tr.append(th);
            }
            table.append(tr);
        }
    }
}
