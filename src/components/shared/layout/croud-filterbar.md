### Basic usage

    <croud-filterbar :search.sync="searchText">Search for: {{ searchText }}</croud-filterbar>

### Slot
Pass additional inputs and options through the filterbar's slot

    <croud-filterbar :search.sync="searchText">
        <croud-date-range :start="today" :end="tomorrow" />
        <croud-overflow-menu :options="[{name: 'Delete', method: () => {} }, {name: 'Postpone', method: () => {}}, {name: 'Copy', method: () => {}, disabled: true}]"></croud-overflow-menu>
    </croud-filterbar>