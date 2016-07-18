/**
 * Abstract Queue.
 */
class AbstractQueue {

    /**
     * Basic constructor which may optionally process a given
     * initial set of items.
     *
     * @param initialSet
     */
    constructor() {
    }

    /**
     * Set all items at once.
     *
     * @param itemSet
     */
    setItems(itemSet) {
        this.itemSet = itemSet;
    }

    /**
     * Get all items at once.
     *
     * @returns {*|Array}
     */
    getItems() {
        return this.itemSet;
    }

    /**
     * Add a single item to the Queue.
     *
     * @param item
     */
    addItem(item) {
        throw new Error('This is an abstract queue. Please extend the class and override method addItem().');
    }

    /**
     * Acquire next item of the Queue.
     *
     * @returns {T}
     */
    next() {
        throw new Error('This is an abstract queue. Please extend the class and override the method next().');
    }

    /**
     * Boolean check if the Queue has remaining items.
     *
     * @returns {boolean}
     */
    hasItem() {
        return !!this.itemSet.length;
    }

    /**
     * Get numeric count of remaining Queue items.
     *
     * @returns {Number}
     */
    getLength() {
        return this.itemSet.length;
    }

    /**
     * Apply a Filter on the ItemSet to get rid of unwanted Items.
     *
     * Supports simple key-value objects which apply strict filters
     * as well as more elaborate greater-than ($gt) and less-than
     * ($lt) operators useful for numeric properties.
     *
     * @param filter
     * @returns void
     */
    findAndRemove(filter) {
        if (filter === undefined || typeof filter !== 'object') {
            return;
        }

        this.getItems().forEach( (item, itemKey) =>  {
            Object.keys(filter).forEach( (filterKey) => {
                if (!item[filterKey]) {
                    return;
                }

                if (filter[filterKey] === item[filterKey]) {
                    item.remove = true;
                    return;
                }

                if (typeof filter[filterKey] === 'object') {
                    let filterVal = filter[filterKey];
                    let filterOperator = Object.keys(filterVal)[0];
                    let filterOperand  = filterVal[filterOperator];
                    let itemOperand    = item[filterKey];

                    if (filterOperator === '$gt') {
                        item.remove = itemOperand > filterOperand;
                    } else if (filterOperator === '$lt') {
                        item.remove = itemOperand < filterOperand;
                    }
                }

            });
        });

        let index = this.itemSet.length - 1;
        while (index >= 0) {
            if (this.itemSet[index].remove) {
                this.itemSet.splice(index, 1);
            }
            index -= 1;
        }
    }

    /**
     * Make sure that the FIFO Queue gets stringified nicely
     * if needed to be logged or printed to the stdout.
     *
     * @returns string
     */
    toString() {
        if (this.itemSet.length === 0) {
            return ' <empty> ';
        }

        let i = 0;
        let out = '';
        this.itemSet.forEach((item) => {
            out += ` [${item._id || item.id || i++}] `;
        });

        return `<-${out}<-`;
    }
}

module.exports = AbstractQueue;