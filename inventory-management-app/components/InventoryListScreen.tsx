import React, { useCallback, useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  FlatListProps,
  ListRenderItemInfo,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import GradientBackground from "../utils/GradientBackground";
import { Card, DataTable, IconButton, Text } from "react-native-paper";
import { ledgerData } from "../utils/SysData";
import { DEFAULT_THEME_COLOR, ERR_MSG, months } from "../utils/SysConsts";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useFocusEffect } from "@react-navigation/native";
import useAlertModal from "../helper/useAlertModal";
import useLoader from "../helper/useLoader";
import { CallApiGet, CallApiPost } from "../utils/ServiceHelper";
import { InventoryItemType, SkuClass } from "../shared/SharedInterface";
import FilterSkuModal from "./FilterSkuModal";
import { URL } from "../utils/UrlConstants";
const { width, height } = Dimensions.get("window");

const InventoryListScreen = () => {
  const { showModal, Modal } = useAlertModal();
  const [openFilter, setOpenFilter] = useState(false);
  const { startAnimation, stopAnimation } = useLoader();
  const [locDate, setLocDate] = useState<{
    startDate: Date;
    endDate: Date;
  }>({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [tapCounter, setTapCounter] = useState(0);
  const [inventoryList, setInventoryList] = useState<InventoryItemType[]>([]);

  useFocusEffect(
    useCallback(() => {
      let lendDate = new Date();
      let lstartDate = new Date();
      lstartDate.setDate(lendDate.getDate() - 7);
      setLocDate({ startDate: lstartDate, endDate: lendDate });
      fetchInventory(lstartDate, lendDate);
    }, [])
  );

  useEffect(() => {
    fetchInventory(locDate?.startDate, locDate?.endDate);
  }, [locDate]);

  const showFilterModal = () => setOpenFilter(true);
  const hideFilterModal = () => {
    setOpenFilter(false);
  };

  const getQtyToRender = (qtyType: "T" | "A") => {
    switch (qtyType) {
      case "T":
        return inventoryList?.reduce(
          (sum, item) => sum + item?.purchasedQty,
          0
        );
      case "A":
        return inventoryList?.reduce((sum, item) => sum + item?.avlQnt, 0);
    }
  };

  const fetchInventory = async (
    argStartDt: Date,
    argEndDt: Date,
    argFilter: any = null
  ) => {
    startAnimation();
    const reqStartDt = `${argStartDt.getFullYear()}-${(
      argStartDt.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${argStartDt.getDate().toString().padStart(2, "0")}`;
    const reqEndDt = `${argEndDt.getFullYear()}-${(argEndDt.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${argEndDt.getDate().toString().padStart(2, "0")}`;
    let payload = {
      fromDt: reqStartDt,
      toDt: reqEndDt,
    };
    if (!!argFilter) {
      payload = { ...argFilter };
    }
    const ledgerResp = await CallApiPost(URL.FETCH_INV_LIST, payload);
    if (ledgerResp.respCode === 200) {
      setInventoryList(ledgerResp.respData);
    } else {
      showModal({
        visible: true,
        isSuccess: -1,
        message: [ERR_MSG.E500],
        iconSrc: "",
      });
    }
    stopAnimation();
  };

  const getCostPrice = (item: any): number => {
    return item?.billArr?.reduce(
      (sum: number, bill: any) =>
        sum + bill?.quantity * bill?.inventoryInfo?.inventory?.unitCp,
      0
    );
  };
  const formatDateRange = (): string => {
    const startDay = locDate?.startDate?.getDate().toString().padStart(2, "0");
    const startMonth = locDate?.startDate?.getMonth() + 1;
    const endDay = locDate?.endDate?.getDate().toString().padStart(2, "0");
    const endMonth = locDate?.endDate?.getMonth() + 1;

    return `${startDay}/${startMonth} - ${endDay}/${endMonth}`;
  };

  const getMonthYear = (): string => {
    return `${
      months[locDate?.endDate?.getMonth() || -1]
    } ${locDate?.endDate?.getFullYear()}`;
  };

  const handleStartDateChange = (event: any, selectedDate?: Date) => {
    setShowStartPicker(false);
    if (!!selectedDate) {
      setLocDate({ ...locDate, startDate: selectedDate });
    }
  };

  const handleEndDateChange = (event: any, selectedDate?: Date) => {
    setShowEndPicker(false);
    if (selectedDate) {
      setLocDate({ ...locDate, endDate: selectedDate });
    }
  };

  const showDatePicker = () => {
    if (tapCounter % 2 === 0) {
      setShowStartPicker(true);
    } else {
      setShowEndPicker(true);
    }
    setTapCounter(tapCounter + 1);
  };

  const renderCostDtls = (item: any) => {
    // const cp = getCostPrice(item);
    return (
      <View style={styles.priceContainer}>
        <View style={styles.priceItem}>
          <Text style={styles.priceLabel}>CP</Text>
          <Text style={styles.costPrice}>₹{item?.unitCp?.toFixed(2)}</Text>
        </View>
        <View style={styles.priceItem}>
          <Text style={styles.priceLabel}>SP</Text>
          <Text style={styles.costPrice}>₹{item?.unitSp?.toFixed(2)}</Text>
        </View>

        <View style={styles.priceItem}>
          <Text style={styles.priceLabel}>IN</Text>
          <Text style={styles.sellPrice}>{item?.purchasedQty}</Text>
        </View>

        <View style={styles.priceItem}>
          <Text style={styles.priceLabel}>OUT</Text>
          <Text style={styles.profitPrice}>{item?.soldQty}</Text>
        </View>
      </View>
    );
  };

  const renderInventoryCard = ({
    item,
  }: ListRenderItemInfo<InventoryItemType>) => (
    <TouchableOpacity>
      <Card style={styles.transactionCard}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <View style={styles.leftSection}>
              <Text style={styles.productName}>{item?.particular}</Text>
              <Text style={styles.skuText}>
                {item?.inventoryType}-{item?.categoryType}
              </Text>
            </View>
            <View style={styles.rightSection}>
              <Text style={styles.dateText}>{item?.sku}</Text>
              <Text style={styles.quantityText}>
                {item?.color}-{item?.dimension}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />
          {renderCostDtls(item)}
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  const handleOnFilter = (argFilter: SkuClass) => {
    fetchInventory(locDate.startDate, locDate.endDate, argFilter);
  };

  return (
    <GradientBackground>
      {Modal}
      <View style={styles.content}>
        {/* Summary Card with Vertical Divider */}
        <Card style={styles.summaryCard}>
          <Card.Content>
            <View style={styles.summaryContainer}>
              {/* Date Range Section */}
              <TouchableOpacity
                style={styles.dateSection}
                onPress={showDatePicker}
              >
                <Text style={styles.sectionLabel}>Period</Text>
                <Text style={styles.dateRange}>{formatDateRange()}</Text>
                <Text style={styles.dateSubtext}>{getMonthYear()}</Text>
                <Text style={styles.tapHint}>Tap to change dates</Text>
              </TouchableOpacity>

              <View style={styles.verticalStack}>
                {/* Vertical Divider */}
                <View style={styles.verticalDivider} />
                {/* Filter Icon */}
                <IconButton
                  icon="filter" // Use the filter icon
                  size={24} // Adjust size as needed
                  onPress={showFilterModal}
                  style={styles.filterIcon}
                  iconColor={DEFAULT_THEME_COLOR} // Optional styling for the icon
                />
                {/* Vertical Divider */}
                <View style={styles.verticalDivider} />
              </View>

              {/* Gross Profit Section */}
              <View style={styles.profitSection}>
                <Text style={styles.sectionLabel}>Available Qty</Text>
                <Text style={styles.grossProfit}>{getQtyToRender("A")}</Text>
                <Text style={styles.profitSubtext}>
                  Total: {getQtyToRender("T")}
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>
        <FlatList
          data={inventoryList}
          keyExtractor={(item) => item.sku}
          renderItem={renderInventoryCard}
        />
      </View>
      {/* Date Picker Modals */}
      {showStartPicker && (
        <DateTimePicker
          title="Start Date Picker"
          value={locDate.startDate}
          mode="date"
          display="default"
          onChange={handleStartDateChange}
          maximumDate={locDate.endDate}
        />
      )}

      {showEndPicker && (
        <DateTimePicker
          title="End Date Picker"
          value={locDate.endDate}
          mode="date"
          display="default"
          onChange={handleEndDateChange}
          minimumDate={locDate.startDate}
          maximumDate={new Date()}
        />
      )}
      <FilterSkuModal
        visible={openFilter}
        hideModal={hideFilterModal}
        handleOnFilter={handleOnFilter}
      />
    </GradientBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
  },
  header: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    elevation: 0,
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  summaryCard: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    marginBottom: 20,
    borderRadius: 16,
  },
  summaryContainer: {
    flexDirection: "row",
    alignItems: "center",
    // paddingVertical: 4,
  },
  dateSection: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 4,
  },
  profitSection: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 4,
  },
  verticalStack: {
    flexDirection: "column", // Vertical layout for divider and icon
    justifyContent: "center",
    alignItems: "center",
    height: 75, // Match parent height
    paddingHorizontal: 8, // Add spacing as needed
  },
  verticalDivider: {
    width: 1,
    height: 15,
    backgroundColor: DEFAULT_THEME_COLOR,
    marginHorizontal: 20,
  },
  filterIcon: {
    // Optional styles for the filter icon
    alignSelf: "center", // Center the icon horizontally
    marginVertical: 0,
    paddingVertical: 0, // Add vertical margin if needed
  },
  sectionLabel: {
    color: DEFAULT_THEME_COLOR,
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 4,
  },
  dateRange: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  dateSubtext: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 11,
  },
  tapHint: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: 9,
    fontStyle: "italic",
  },
  grossProfit: {
    color: "#4ade80",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 2,
  },
  profitSubtext: {
    color: DEFAULT_THEME_COLOR,
    fontSize: 11,
  },
  transactionsList: {
    paddingBottom: 20,
  },
  transactionCard: {
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: 12,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  leftSection: {
    flex: 1,
  },
  rightSection: {
    alignItems: "flex-end",
  },
  productName: {
    color: DEFAULT_THEME_COLOR,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  skuText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 12,
  },
  dateText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 2,
  },
  quantityText: {
    color: DEFAULT_THEME_COLOR,
    fontSize: 12,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    marginBottom: 12,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  priceItem: {
    alignItems: "center",
    flex: 1,
  },
  priceLabel: {
    color: DEFAULT_THEME_COLOR,
    fontSize: 11,
    fontWeight: "500",
    marginBottom: 4,
  },
  costPrice: {
    color: "#ef4444",
    fontSize: 14,
    fontWeight: "600",
  },
  sellPrice: {
    color: "#3b82f6",
    fontSize: 14,
    fontWeight: "600",
  },
  profitPrice: {
    color: "#4ade80",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default InventoryListScreen;
