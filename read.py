import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

class CSVVisualizer:
    def __init__(self, file_path):
        self.file_path = file_path
        self.df = None  # DataFrame will be initialized after reading the CSV
        self.columns = []  # Store the list of columns
        self.load_csv()  # Automatically load CSV on initialization

    def load_csv(self):
        """Load CSV file into a DataFrame and get columns"""
        try:
            self.df = pd.read_csv(self.file_path)
            self.columns = self.df.columns.tolist()
            print(f"CSV loaded successfully with columns: {self.columns}")
        except Exception as e:
            print(f"Error loading CSV: {e}")

    def list_columns(self):
        """List the available columns in the CSV"""
        print("Available columns:")
        for idx, col in enumerate(self.columns):
            print(f"{idx + 1}. {col}")

    def select_columns(self):
        """Let the user select two columns for plotting"""
        self.list_columns()

        try:
            x_col_idx = int(input("Select the index for the X-axis column: ")) - 1
            y_col_idx = int(input("Select the index for the Y-axis column: ")) - 1

            x_col = self.columns[x_col_idx]
            y_col = self.columns[y_col_idx]

            return x_col, y_col
        except (IndexError, ValueError):
            print("Invalid input. Please try again.")
            return None, None

    def select_chart_type(self):
        """Let the user select the chart type for plotting"""
        print("Chart types available:")
        print("1. Scatter")
        print("2. Line")
        print("3. Bar")
        print("4. Histogram")
        print("5. Box Plot")

        chart_type = input("Select the chart type (1/2/3/4/5): ")

        if chart_type == "1":
            return "scatter"
        elif chart_type == "2":
            return "line"
        elif chart_type == "3":
            return "bar"
        elif chart_type == "4":
            return "histogram"
        elif chart_type == "5":
            return "box"
        else:
            print("Invalid input. Defaulting to 'scatter' plot.")
            return "scatter"

    def select_color(self):
        """Let the user select the color for the chart"""
        print("Available colors:")
        print("1. Blue")
        print("2. Green")
        print("3. Red")
        print("4. Purple")
        print("5. Orange")

        color_choice = input("Select the color for the chart (1/2/3/4/5): ")

        color_dict = {
            "1": "blue",
            "2": "green",
            "3": "red",
            "4": "purple",
            "5": "orange"
        }

        return color_dict.get(color_choice, "blue")

    def select_labels(self):
        """Let the user set labels, legend, and titles for the chart"""
        x_label = input("Enter the label for the X-axis: ")
        y_label = input("Enter the label for the Y-axis: ")
        title = input("Enter the title of the chart: ")
        legend = input("Enter the legend label: ")

        return x_label, y_label, title, legend

    def select_line_of_best_fit(self):
        """Ask the user if they want to include a line of best fit in scatter plot"""
        include_line = input("Would you like to add a line of best fit to the scatter plot? (y/n): ")
        return include_line.lower() == 'y'

    def calculate_grouped_average(self, x_col, y_col):
        """Calculate and return the average of Y-axis grouped by X-axis"""
        grouped_df = self.df.groupby(x_col)[y_col].mean()
        print(f"\n--- Grouped Average of {y_col} based on {x_col} ---")
        print(grouped_df)
        return grouped_df

    def select_bar_data(self, x_col, y_col):
        """Let the user choose to plot raw data or average of Y-axis based on X-axis for the bar chart"""
        print("\nFor the Bar Chart, choose the data to display:")
        print("1. Raw Data")
        print("2. Average of Y-axis based on X-axis")

        choice = input("Select an option (1/2): ")

        if choice == "1":
            return self.df[y_col], self.df[x_col]  # Raw data
        elif choice == "2":
            grouped_average = self.calculate_grouped_average(x_col, y_col)
            return grouped_average, grouped_average.index  # Grouped average
        else:
            print("Invalid choice. Defaulting to raw data.")
            return self.df[y_col], self.df[x_col]

    def plot(self, x_col, y_col, chart_type, color, x_label, y_label, title, legend, include_line_of_best_fit):
        """Generate different pairwise plots for the selected columns"""
        if x_col is None or y_col is None:
            print("No valid columns selected for plotting.")
            return

        print(f"Plotting {x_col} vs {y_col} as a {chart_type} plot with color {color}")

        plt.figure(figsize=(8, 6))

        if chart_type == "scatter":
            plt.scatter(self.df[x_col], self.df[y_col], color=color, alpha=0.5, label=legend)
            plt.title(title)

            if include_line_of_best_fit:
                # Calculate line of best fit
                m, b = np.polyfit(self.df[x_col], self.df[y_col], 1)
                plt.plot(self.df[x_col], m * self.df[x_col] + b, color='red', linestyle='--', label='Line of Best Fit')

        elif chart_type == "line":
            # Sort the data by the X-axis values before plotting
            sorted_df = self.df.sort_values(by=x_col)
            plt.plot(sorted_df[x_col], sorted_df[y_col], color=color, label=legend)
            plt.title(title)

        elif chart_type == "bar":
            y_data, x_data = self.select_bar_data(x_col, y_col)
            plt.bar(x_data, y_data, color=color, label=legend)
            plt.title(title)

        elif chart_type == "histogram":
            plt.hist(self.df[y_col], bins=30, color=color, alpha=0.7, label=legend)
            plt.title(title)

        elif chart_type == "box":
            plt.boxplot(self.df[y_col], patch_artist=True, boxprops=dict(facecolor=color))
            plt.title(title)
            plt.xticks([1], [y_col])

        plt.xlabel(x_label)
        plt.ylabel(y_label)
        plt.legend()
        plt.show()

    def print_preview(self, x_col, y_col):
        """Print the first 50 rows of the selected columns for debugging"""
        if x_col is None or y_col is None:
            print("No valid columns selected for preview.")
            return

        # Print the first 50 rows of the selected columns
        print(f"\n--- Preview of {x_col} and {y_col} (First 50 rows) ---")
        print(self.df[[x_col, y_col]].head(50))

    def run(self):
        """Run the CSV visualizer tool"""
        x_col, y_col = self.select_columns()

        # Call the debug print function before plotting
        self.print_preview(x_col, y_col)

        # Select chart type and color
        chart_type = self.select_chart_type()
        color = self.select_color()

        # Select labels, legend, and titles
        x_label, y_label, title, legend = self.select_labels()

        # Option for line of best fit
        include_line_of_best_fit = False
        if chart_type == "scatter":
            include_line_of_best_fit = self.select_line_of_best_fit()

        # Plot the selected columns
        self.plot(x_col, y_col, chart_type, color, x_label, y_label, title, legend, include_line_of_best_fit)

# Main program
if __name__ == "__main__":   
    # Prompt the user to input the file path
    file_path = input("Please enter the CSV file path: ")

    # Create the visualizer object and run it
    visualizer = CSVVisualizer(file_path)
    visualizer.run()

    cont = input("Make another graph? Y/N: ")
    while cont.lower() == "y":
        visualizer.run()
        cont = input("Make another graph? Y/N: ")
